<?php

class DBConn{

    private static $DBConn = null;

    static function makeDBConn(){
        if (self::$DBConn == null){
            try{
                $pdo = new PDO("mysql:host=qdm193099655.my3w.com;dbname=qdm193099655_db","qdm193099655","60206038");
                $pdo -> setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                self::$DBConn = $pdo;
            }catch (PDOException $e){
                echo "error";
            }
        }
        return self::$DBConn;
    }

}