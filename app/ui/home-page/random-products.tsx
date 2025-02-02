import Image from 'next/image';
import Link from 'next/link';

export default function RandomProducts() {
  return (
    <section>
        <h2>Some Products</h2>
        <ul>
            <li>
                <h3>Product Name</h3>
                <Link href="/products/1"><Image src='/placeholder.jpg' alt='placeholder for now' width={250} height={250}/></Link>
            </li>
            <li>
                <h3>Product Name</h3>
                <Link href="/products/2"><Image src='/placeholder.jpg' alt='placeholder for now' width={250} height={250}/></Link>
            </li>
            <li>
                <h3>Product Name</h3>
                <Link href="/products/3"><Image src='/placeholder.jpg' alt='placeholder for now' width={250} height={250}/></Link>
            </li>
        </ul>
    </section>
  );
}