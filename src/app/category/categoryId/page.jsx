// import Layout from '../../components/layout';
import { getCategories } from "@/lib/data"

export default function page({ params, searchParams }) {
    const data = getCategories();
    return <div>
        {data.map(category => (
            <div key={category.id}>
                <p>{category.id}</p>
            </div>
        ))}
    </div>;
}

// export async function getStaticPaths() {
//     // Return a list of possible value for id
// }

// export async function getStaticProps({ params }) {
//     // Fetch necessary data for the blog post using params.id
// }