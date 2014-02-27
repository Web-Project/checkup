<?php

namespace Album\Model\Table;

use Album\Model\Table\Table;
use Zend\Db\Sql\Select;

class AlbumSecondTable extends Table
{

    public function fetchAll(Select $select)
    {   
        $select->from('album');

        return $this->fetchAllToArray($select);
    }
}