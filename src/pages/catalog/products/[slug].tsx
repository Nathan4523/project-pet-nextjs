import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState } from 'react';

//optimazion
const AddToCartModal = dynamic(
    () => import('@/components/AddToCartModal'), //../../../components/AddToCartModal
    {
        loading: () => <p>Loading...</p>,
        ssr: false, //not rending into node, only browser
    }
)   
// NextJs imported this component, even though the user is not using it
// For use of dynamic use, you can import dynamic function
// import AddToCartModal from '../../../components/AddToCartModal';

export default function Product() {
    const router = useRouter();
    const [isAddToCartModalVisible, setIsAddToCartModalVsible] = useState(false);

    function handleAddCart(){
        setIsAddToCartModalVsible(true);
    }

    return (
        <div>
            <h1>{router.query.slug}</h1>

            <button onClick={handleAddCart}>Add to cart</button>

            {isAddToCartModalVisible && <AddToCartModal />}
        </div>
    )
}