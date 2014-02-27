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
        
        //session_destroy();
        if(empty($this->_sessionContainer->user_id))
        {
            $view = new ViewModel();
            $view->setTemplate('application/index/login');

            return $view;
        }

        return new ViewModel();
    }

    public function loginAction()
    {
        $request = $this->getRequest();

        if ($request->isPost()) 
        {
            $postData = $request->getPost();

            if($postData['username'] == 'admin' && $postData['password'] == 'admin')
            {
                $this->_sessionContainer->user_id = '123';

                return new JsonModel(array(
                                    "success" => true,
                                    "message" => "Logged in",
                                    "redirect" => "/"
                                ));
            }
        }
        else
        {
            return new JsonModel(array(
                                    "success" => false,
                                    "message" => "Logged out",
                                    "redirect" => "/"
                                ));
        }
    }

    public function logoutAction()
    {
        session_destroy();

        return $this->redirect()->toRoute('home');
    }
}
