<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2014 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\Session\Container;
use Zend\View\Model\JsonModel;
use Zend\Crypt\Password\Bcrypt;

use \Exception;

class IndexController extends AbstractActionController
{
    private $_sessionContainer;
    private $_view;
    private $_model;

    public function __construct()
    {
        $this->_sessionContainer = new Container('Checkup');
        $this_view = new ViewModel();
        
    }

    private function _getTable()
    {
        $serviceLocator = $this->getServiceLocator();
        $model = $serviceLocator->get('Application\Model\Model');

        return $model;
    }

    public function indexAction()
    {
        $token  = $this->NoCSRF()->generate('token');
        if(empty($this->_sessionContainer->user_id))
        {
            $view = new ViewModel(
                array(
                    'token' => $token
                )
            );
            $view->setTemplate('application/index/login');

            return $view;
        }

        return new ViewModel(
            array(
                'token' => $token
            ));
    }

    public function loginAction()
    {
        $retVal = array(
            "success" => true,
            "message" => "Logged in",
            "redirect" => "/"
        );

        $request = $this->getRequest();

        if ($request->isPost()) 
        {
            $postData = $request->getPost();

            try
            {   
                $this->NoCSRF()->check( 'token', $postData, true, 60*10, false);


                $username = $postData['username'];
                $password = $postData['password'];
                
                $model = $this->_getTable();
                $users = $model->get('Users');
                $result = $users->getUserAccount($username);

                if(!empty($result))
                {
                    $securePassword = $result['password'];

                    $bcrypt = new Bcrypt();

                    if ($bcrypt->verify($password, $securePassword))
                    {
                        $users->logUserLastLogin($result['user_id']);

                        $this->_sessionContainer->user_id = $result['user_id'];
                        $this->_sessionContainer->user_fName = $result['fName'];
                        $this->_sessionContainer->user_lName = $result['lName'];

                        
                    } 
                    else 
                    {
                        $retVal = array(
                            "success" => false,
                            "errorMessage" => "Invalid username/password",
                            "redirect" => "/"
                        );
                    }
                }
                else
                {
                    $retVal = array(
                        "success" => false,
                        "errorMessage" => "Invalid username/password",
                        "redirect" => "/"
                    );
                }
                
            } 
            catch(\Exception $e) 
            {
                $errorMessage = 'Invalid username/password';
                if(strpos($e->getMessage(), 'password') !== false)
                {
                    $errorMessage = 'Invalid username/password';
                }

                if(strpos(strtolower($e->getMessage()), 'csrf') !== false)
                {
                    $errorMessage = 'Invalid request source';
                }

                $retVal = array(
                    "success" => false,
                    "errorMessage" => $errorMessage,
                    "redirect" => "/"
                );
            }

        }
        else
        {
            $retVal = array(
                "success" => false,
                "errorMessage" => "Logged out",
                "redirect" => "/"
            );
        }

        return new JsonModel($retVal);
    }

    public function logoutAction()
    {
        $retVal = array(
            "success" => true,
            "message" => "Logged out",
            "redirect" => "/"
        );

        try
        {  
            $request = $this->getRequest();
            $postData = $request->getPost(); 
            $this->NoCSRF()->check( 'token', $postData, true, 60*10, false);

            $this->_sessionContainer->getManager()->destroy();

        } 
        catch(\Exception $e) 
        {
            $retVal = array(
                "success" => false,
                "errorMessage" => "Invalid request source",
                "redirect" => "/"
            );
        }

        
        return new JsonModel($retVal);
        
    }
}
