<?php

namespace Application\Model;

class ItemMasterData extends Table
{

	private $_name = 'itemmasterdata';

    public function getItems()
    {
        $select = $this->select()
                        ->from($this->_name);
        return $this->fetchAllToArray($select);
    }
}