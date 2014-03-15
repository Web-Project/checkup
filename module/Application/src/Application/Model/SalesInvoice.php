<?php

namespace Application\Model;

class SalesInvoice extends Table
{

	private $_name = 'salesinvoice';

    public function getSalesInvoices()
    {
        $select = $this->select()
                        ->from($this->_name);
        return $this->fetchAllToArray($select);
    }
}