<?php

namespace Album\Model\Table;

use Zend\Db\Adapter\Adapter;
use Zend\Db\Sql\Sql;
use Zend\Db\Sql\Select;

class Table
{
    protected $_dbAdapter;
    protected $_sql;

    public function __construct(Adapter $dbAdapter)
    {
        $this->_dbAdapter = $dbAdapter;
        $this->_sql = new Sql($dbAdapter);
    }

    public function fetchAllToArray(Select $select)
    {
        $statement = $this->_sql->prepareStatementForSqlObject($select);
        foreach ($statement->execute() as $row) {
            $results[] = $row;
        }
        return $results;
    }

    public function fetchRowToArray(Select $select)
    {
        $statement = $this->_sql->prepareStatementForSqlObject($select);
        $result = $statement->execute()->current();
        return $result;
    }

    public function select($tableName = null)
    {
        return new Select($tableName);
    }
}