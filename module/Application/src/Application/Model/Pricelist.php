<?php

namespace Application\Model;

class Pricelist extends Table
{

	private $_name = 'pricelist';

    public function getPriceListByItem($itemCode)
    {
        $select = $this->select()
                        ->from($this->_name)
                        ->where(array('itemCode' => $itemCode));
        return $this->fetchAllToArray($select);
    }
}