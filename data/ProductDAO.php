<?php
//data/ProductDAO.php
require_once("DBConfig.php");
require_once("/home/manhattabl/www/test/entities/Product.php");
class ProductDAO{
    public function getProducts($type,$size)
    {
        $sql = "SELECT id, name, type, price FROM products WHERE size = '$size' ORDER BY price";

        $dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USERNAME, DBConfig::$DB_PASSWORD);


            $resultSet = $dbh->query($sql);

        $list = array();
        foreach ($resultSet as $row) {
            $sql3 = 'SELECT ingredients.name as name from product_ing inner join ingredients on product_ing.ingredient_id = ingredients.id WHERE product_ing.product_id = '.$row["id"].' ';
            unset($ingredients);
            $ingredients = array();
            $resultSet2 = $dbh->query($sql3);
            foreach ($resultSet2 as $row2){
                array_push($ingredients, $row2["name"]);
            }
            $array = array();
            $product = Product::create($row["id"], $row["name"], $row["type"],$size, $row["price"],null, $ingredients, $array, $array);
            array_push($list,$product);
        }
        $dbh = null;
        return $list;
    }

}
?>