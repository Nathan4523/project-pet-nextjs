import { GetStaticProps } from "next";

import { Title } from '../styles/pages/Home';

interface IProduct {
    id: string;
    title: string;
}

interface Top4Props {
    products: IProduct[];
}

export default function Top4({ products }: Top4Props) {
    return (
        <div>
            <Title>Top 4</Title>

            <ul>
                {products.map(recommendedProduct => {
                    return (
                        <li key={recommendedProduct.id}>
                            {recommendedProduct.title}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

//If case you want use content static, you can use this function, for to generate static content
export const getStaticProps: GetStaticProps<Top4Props> = async (context) => {
    const response = await fetch('http://localhost:3333/products');
    const products = await response.json();

    return {
        props: {
            products
        },
        revalidate: 5 //interval
    }
}