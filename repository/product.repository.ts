import Product from "../models/product.model"

interface CreateProductDTO {
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

class ProductRepository{
    async create(data: CreateProductDTO){
        return Product.create(data);
    }

    async findAll(){
        return Product.find();
    }

    async findById(id: string){
        return Product.findById(id);
    }
}

export default ProductRepository;