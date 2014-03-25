<?php
namespace Application\Controller;

use Application\Controller\Controller;

use Zend\View\Model\JsonModel;
use Zend\Crypt\Password\Bcrypt;

use \Exception;

class ItemMasterDataController extends Controller
{

    public function indexAction()
    {
        $retVal = array(
            'success'       => false,
            'rows'          => array(),
            'totalRecords'  => 0
        );

        $model = $this->model('ItemMasterData');
        $result = $model->getItems();

        if(!empty($result))
        {
            $retVal['success'] = true;
            $retVal['rows'] = $result;
            $retVal['totalRecords'] = count($result);
        }


        return new JsonModel($retVal);
    }

    public function getBarcodesByItemAction()
    {
        $retVal = array(
            'success'       => true,
            'rows'          => array(),
            'totalRecords'  => 0
        );

        $request = $this->getRequest();

        if ($request->isPost()) 
        {
            $postData = $request->getPost();

            $itemCode = $postData['itemCode'];

            $model = $this->model('Barcode');
            $result = $model->getBarcodeByItem($itemCode);

            if(!empty($result))
            {
                $retVal['success'] = true;
                $retVal['rows'] = $result;
                $retVal['totalRecords'] = count($result);
            }
        }

        return new JsonModel($retVal);
    }

    public function getPriceListByItemAction()
    {
        $retVal = array(
            'success'       => false,
            'rows'          => array(),
            'totalRecords'  => 0
        );

        $request = $this->getRequest();

        if ($request->isPost()) 
        {
            $postData = $request->getPost();

            $itemCode = $postData['itemCode'];

            $model = $this->model('Pricelist');
            $result = $model->getPriceListByItem($itemCode);

            if(!empty($result))
            {
                foreach ($result as &$value) {
                    if($value['priceListCode'] == '0')
                    {
                        $value['priceListName'] = 'Purchase price';
                    }
                    else if($value['priceListCode'] == '1')
                    {
                        $value['priceListName'] = 'Retail price';
                    }
                }
                $retVal['success'] = true;
                $retVal['rows'] = $result;
                $retVal['totalRecords'] = count($result);
            }
            else
            {
                $result = array(
                    array(
                        'itemCode'  => $itemCode,
                        'priceListCode' => '0',
                        'priceListName' => 'Purchase price',
                        'netPrice'  => '0'
                    ),
                    array(
                        'itemCode'  => $itemCode,
                        'priceListCode' => '1',
                        'priceListName' => 'Retail price',
                        'netPrice'  => '0'
                    )
                );
            }
        }

        return new JsonModel($retVal);
    }

}
