<?php

namespace Github\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class AlbumController extends AbstractActionController
{
    protected $albumTable;

    public function indexAction()
    {
        echo "Fetching changes from git server";
        echo exec('git pull origin master');
        echo "Already up to date for test";
    }
}