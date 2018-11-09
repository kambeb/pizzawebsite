    <?php

require_once("/home/manhattabl/www/test/business/ProductServices.php");
$productsSvc = new ProductServices();
$mediumPizzas = $productsSvc->getMediumPizzas();
$largePizzas = $productsSvc->getlargePizzas();


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
?>
{
"products": [
{
"name": "medium_pizzas",
"types": [
<?php
$last_key = array_search(end($mediumPizzas), $mediumPizzas);
foreach ($mediumPizzas as $key=>$pizza) { ?>
    { "type": "<?php echo $pizza->getName(); ?>",
    "price": <?php echo $pizza->getPrice(); ?>,
    "payPrice": <?php echo $pizza->getPrice(); ?>,
    "size": "<?php echo $pizza->getSize(); ?>",
    "ingredients": [

    <?php
    $ings = $pizza->getIngredients();
    $last_key2 = array_search(end($ings), $ings);
    foreach ($ings as $key2=>$value) { ?>
        {"type":"<?php echo $value; ?>"}
        <?php if($key2!=$last_key2){echo ',';} ?>
    <?php } ?>
    ],
    "removedIngredients": [],
    "addedIngredients": []
    }
    <?php if($key!=$last_key){echo ',';} ?>
<?php } ?>
]}
,
{
"name": "large_pizzas",
"types": [
<?php
$last_key = array_search(end($largePizzas), $largePizzas);
foreach ($largePizzas as $key=>$pizza) { ?>
    { "type": "<?php echo $pizza->getName(); ?>",
    "price": <?php echo $pizza->getPrice(); ?>,
    "payPrice": <?php echo $pizza->getPrice(); ?>,
    "size": "<?php echo $pizza->getSize(); ?>",
    "ingredients": [

    <?php
    $ings = $pizza->getIngredients();
    $last_key2 = array_search(end($ings), $ings);
    foreach ($ings as $key2=>$value) { ?>
        {"type":"<?php echo $value; ?>"}
        <?php if($key2!=$last_key2){echo ',';} ?>
    <?php } ?>
    ],
    "removedIngredients": [],
    "addedIngredients": []
    }
    <?php if($key!=$last_key){echo ',';} ?>
<?php } ?>
]
}

],
<?// this part will be generated apart?>

"ingredients": [
{
"type": "mozzarella"
},
{
"type": "blauwe zachte kaas"
},
{
"type": "brie"
},
{
"type": "aardappel schijfjes"
},
{
"type": "olijven"
},
{
"type": "artisjok"
},
{
"type": "geitenkaas"
},
{
"type": "gorgonzola"
},
{
"type": "eundsgehakt"
},
{
"type": "paprika"
},
{
"type": "rode ajuin"
},
{
"type": "champignons"
},
{
"type": "kip"
},
{
"type": "meatballs"
},
{
"type": "ham"
},
{
"type": "merguez"
},
{
"type": "pepperoni"
},
{
"type": "salami"
},
{
"type": "bacon"
},
{
"type": "gerookte spek"
},
{
"type": "ananas"
},
{
"type": "BBQ saus"
},
{
"type": "look saus"
}
]

}


