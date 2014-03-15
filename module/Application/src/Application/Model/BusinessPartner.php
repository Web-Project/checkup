<?php

namespace Application\Model;

class BusinessPartner extends Table
{

	private $_name = 'businesspartner';

    public function getBusinessPartners()
    {
        $select = $this->select()
                        ->from($this->_name);
        return $this->fetchAllToArray($select);
    }
}