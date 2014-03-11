<?php

namespace Application\Model;

class Users extends Table
{

	private $_name = 'users';

    public function getUserAccount($username)
    {   
        $whereClause = array(
        	'username' => $username
        );

        $select = $this->select()
                        ->from($this->_name)
                        ->where($whereClause);

        return $this->fetchRowToArray($select);
    }

    public function logUserLastLogin($user_id)
    {
    	$setClause 		= array( 'lastLogIn' => date('Y-m-d h:i:s') );
    	$whereClause 	= array( 'user_id' => $user_id);

    	$affected_rows 	= $this->update($this->_name, $setClause, $whereClause);

    	return $affected_rows;
    }
}