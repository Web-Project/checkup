<?php

namespace Album\Model\Table;

use Zend\Db\Adapter\Adapter;
use Zend\Db\Sql\Sql;
use Zend\Db\Sql\Select;

use Zend\ServiceManager\ServiceLocatorAwareInterface;
use Zend\ServiceManager\ServiceLocatorInterface;
use Zend\Stdlib\DispatchableInterface as Dispatchable;
use Zend\Stdlib\RequestInterface as Request;
use Zend\Stdlib\ResponseInterface as Response;

class MyServiceManager implements Dispatchable,ServiceLocatorAwareInterface
{
    protected $_sevices;

    public function setServiceLocator(ServiceLocatorInterface $serviceLocator)
    {
        $this->_sevices = $serviceLocator;
    }

    public function getServiceLocator()
    {
        return $this->_sevices;
    }

    public function dispatch(Request $request, Response $response = null)
    {
        // ...

        // Retrieve something from the service manager
        //$router = $this->getServiceLocator()->get('Router');



        // ...
    }
}