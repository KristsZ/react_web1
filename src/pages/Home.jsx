import { Carousel } from 'nuka-carousel';


const img1 = 'https://placehold.co/600x150/EEE/31343C?font=roboto&text=Roboto';
const img2 = 'https://placehold.co/600x150/EEE/31343C?font=lato&text=Lato';
const img3 = 'https://placehold.co/600x150/EEE/31343C?font=lora&text=Lora';


function Home() {
    return (
        <>
            <Carousel showArrows="always" showDots="true" wrapMode="wrap">
                <img src={img1} />
                <img src={img2} />
                <img src={img3} />
            </Carousel>
            <h1>Galvenā</h1>


        </>

    );
}

export default Home;