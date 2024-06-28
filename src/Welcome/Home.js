import ProductCard from "../Products/ProductCard";
import './Home.css';

const Home = ({ products, numOfProducts, setNumOfProducts, user }) => {
    return (
        <div className="Home">
            {products.slice(0, numOfProducts).length > 0
                ?
                <>
                    <div className="Home-Container">
                        {products.slice(0, numOfProducts).map((product, i) => <ProductCard key={i} product={product} user={user} />)}
                    </div>
                    {products.length != products.slice(0, numOfProducts).length &&
                        <div>
                            <a className="Home-More" href="/"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setNumOfProducts((num) => num + 12);
                                }}>
                                See More</a>
                        </div>}
                </>
                :
                <h4 className="Home-None">
                    No Products yet...
                </h4>
            }
        </div>
    )
}

export default Home