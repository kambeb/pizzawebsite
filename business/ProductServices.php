<?php
//business/ProductServices.php

require_once("/home/manhattabl/www/test/data/ProductDAO.php");
class ProductServices{
    public function getMediumPizzas()
    {
        $dao = new productDAO();
        $size = 'medium';
        $products = $dao->getProducts(1,$size);
        return $products;
    }
    public function getLargePizzas()
    {
        $dao2 = new productDAO();
        $size = 'large';
        $products2 = $dao2->getProducts(1,$size);
        return $products2;
    }
}