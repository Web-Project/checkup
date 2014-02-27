<?php

namespace Album\Model;

use Album\Model\Table\Table;

class AlbumSecond extends Table
{

    public function fetchAll()
    {   
        $results = array();

        $select = $this->select()
                        ->from('album');

        return $this->fetchAllToArray($select);
    }
}