import ProductRepository from "../repository/product.repository"

class ProductService{

    private repo: ProductRepository;

    constructor(){
        this.repo = new ProductRepository();
    }

    async createProduct(data: any){
        return this.repo.create(data);
    }

    async getProduct() {
        return this.repo.findAll();
    }

    async getProductById(id: any){
        return this.repo.findById(id);
    }
}

export default ProductService;