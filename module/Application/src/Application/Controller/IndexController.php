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

use \Exception;

class IndexController extends AbstractActionController
{
    private $_sessionContainer;
    private $_view;

    public function __construct()
    {
        $this->_sessionContainer = new Container('Checkup');
        $this_view = new ViewModel();
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


                if($postData['username'] == 'admin' && $postData['password'] == 'admin')
                {
                    $this->_sessionContainer->user_id = '123';
                }
            } 
            catch(\Exception $e) 
            {
                $retVal = array(
                    "success" => false,
                    "errorMessage" => "Invalid request source",
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

            session_destroy();

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
