<?
//entities/Product.php
class Product{

    private static $idMap = array();

    private $id;
    private $name;
    private $type;
    private $size;
    private $price;
    private $payPrice;
    private $ingredients = array();
    private $extraIngredients = array();
    private $withoutIngredients = array();

    public function __construct($id, $name, $type, $size, $price, $payPrice, array $ingredients, array $extraIngredients, array $withoutIngredients)
    {
        $this->id = $id;
        $this->name = $name;
        $this->type = $type;
        $this->size = $size;
        $this->price = $price;
        $this->payPrice = $payPrice;
        $this->ingredients = $ingredients;
        $this->extraIngredients = $extraIngredients;
        $this->withoutIngredients = $withoutIngredients;
    }

    public static function create($id, $name, $type, $size, $price, $payPrice, array $ingredients, array $extraIngredients, array $withoutIngredients)
    {
        if (!isset(self::$idMap[$id])) {
            self::$idMap[$id] = new Product($id, $name, $type, $size, $price, $payPrice, $ingredients, $extraIngredients, $withoutIngredients);
        }
        return self::$idMap[$id];
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @param mixed $type
     */
    public function setType($type)
    {
        $this->type = $type;
    }

    /**
     * @return mixed
     */
    public function getSize()
    {
        return $this->size;
    }

    /**
     * @param mixed $size
     */
    public function setSize($size)
    {
        $this->size = $size;
    }
    /**
     * @return mixed
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * @param mixed $price
     */
    public function setPrice($price)
    {
        $this->price = $price;
    }

    /**
     * @return mixed
     */
    public function getPayPrice()
    {
        return $this->payPrice;
    }

    /**
     * @param mixed $payPrice
     */
    public function setPayPrice($payPrice)
    {
        $this->payPrice = $payPrice;
    }

    /**
     * @return array
     */
    public function getIngredients()
    {
        return $this->ingredients;
    }

    /**
     * @param array $ingredients
     */
    public function setIngredients($ingredients)
    {
        $this->ingredients = $ingredients;
    }

    /**
     * @return array
     */
    public function getExtraIngredients()
    {
        return $this->extraIngredients;
    }

    /**
     * @param array $extraIngredients
     */
    public function setExtraIngredients($extraIngredients)
    {
        $this->extraIngredients = $extraIngredients;
    }

    /**
     * @return array
     */
    public function getWithoutIngredients()
    {
        return $this->withoutIngredients;
    }

    /**
     * @param array $withoutIngredients
     */
    public function setWithoutIngredients($withoutIngredients)
    {
        $this->withoutIngredients = $withoutIngredients;
    }

}
?>