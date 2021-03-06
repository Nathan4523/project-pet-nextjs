import { GetStaticPaths, GetStaticProps } from "next";
import { route } from "next/dist/next-server/server/router";
import { useRouter } from 'next/router';

interface IProduct {
    id: string;
    title: string;
}

interface CategoryProps {
    products: IProduct[];
}

export default function Category({ products }: CategoryProps) {
    const router = useRouter();

    /**
     * When the fallback = true
     * If the user is on the page, and a new post occurs, it makes the user wait for 
     * a while until they get a new request
     */
    if(router.isFallback){
        return <p>carregando...</p>
    }

    return (
        <div>
            <h1>{router.query.slug}</h1>

            <ul>
                {products.map(product => {
                    return (
                        <li key={product.id}>
                            {product.title}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

//With params dinamic
//first execute
export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch(`http://localhost:3333/categories`);
    const categories = await response.json();

    const paths = categories.map(category => {
        return {
            params: { slug: category.id }
        }
    })

    return {
        paths,
        fallback: true //this props verify if page was generated, case no, he do generate new page
    }
}

//If case you want use content static, you can use this function, for to generate static content
export const getStaticProps: GetStaticProps<CategoryProps> = async (context) => {
    const { slug } = context.params;
    const response = await fetch(`http://localhost:3333/products?category_id=${slug}`);
    const products = await response.json();

    return {
        props: {
            products
        },
        revalidate: 60 //interval
    }
}