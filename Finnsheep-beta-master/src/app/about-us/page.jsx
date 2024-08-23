import Image from 'next/image'
import React from 'react'

const AboutPage = () => {
  return (
    <div className=''>
        
        <div className="h-40 md:h-60 w-full bg-no-repeat relative bg-cover bg-center" style={{ backgroundImage: `url(/farmview.jpg)` }}>
                {/* <Image src="/farmview.jpg" width={1000} height={1000} className='h-60 w-full object-cover'/> */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black to-transparent opacity-50"></div>
                <div className="relative z-10 flex items-center justify-cente container md:pl-20 h-full">
                <h1 className="text-3xl md:text-5xl font-medium text-left text-white">About Us</h1>
            </div>
            </div>
        <div className="grid grid-cols- items-center gap-6 container py-10 md:py-20 ">
            
            <div className=" text-justify">
            <Image src="/sten.jpg" alt="FinnSheep Family" width={600} height={600} className='h-auto w-ful float-left mr-8 mb-8'/>

                <p>Point of View Farm is home to a flock of purebred registered Finnsheep that rotationally graze on our lush pastures filled with native and planted varieties of grasses, legumes and herbs.
                <br/>
                <br/>
Finnsheep are a multi-purpose heritage breed of sheep that are well known for their versatility and efficiency in wool, meat and even dairy production. The breed is naturally polled (no horns) and lambs are born with short tails that do not require docking/ banding.
<br/>
<br/>
The Point of View Farm Finnsheep flock has been genetically selected for high quality soft crimpy wool with high luster. They have strong maternal qualities, parasite resilience and premium lean tender meat from lambs with fast rates of gain.
<br/>
<br/>
The Point of View Farm Finnsheep flock has been genetically selected for high quality soft crimpy wool with high luster. They have strong maternal qualities, parasite resilience and premium lean tender meat from lambs with fast rates of gain. Point of View Farm Finnsheep are social and friendly with an easy to handle temperament. All this makes them a well suited choice for many operations.  Genetics matter and we stand behind our breeding stock with solid replacement guarantees as we are so confident of their ability.
<br/>
<br/>
The Point of View Farm Finnsheep flock is full of rare naturally colored genetics. We offer lambs and fleece in white, light brown, dark brown, fawn (like vanilla creme), black, faded black, light/ dark greys and patterns including piebald and badgerface (also known as agouti blue and agouti light blue). We hope to be importing finnsheep ram lines directly from overseas in the future for valuable new genetic diversity in the US. The original finnsheep from Finland, where the breed originated, were imported to the United States nearly 50 years ago. Currently, Point of View Farm Finnsheep is maintaining a biosecure flock so we can offer the healthiest lambs you can buy.
<br/>
<br/>
Point of View Farm is a member of the Dutchess County Sheep and Wool Growers Association that organizes the New York Sheep and Wool Festival in Rhinebeck, NY each fall where we proudly attend as Vendors in the lower level of the Horticulture Building, building 22, space D3.  We are also members of The American Finnsheep Breeders Association,  The Natural Colored Wool Growers Association Association,The American Sheep Industry and The Maryland Sheep Breeders Association that organizes the Maryland Sheep and Wool festival the first weekend in May. You will find us at that festival in the Main exhibition hall vendor space C26.<br/>
<br/>
  We are very proud to be members of the Northeast Organic Farmer&apos;s Association (NOFA). Point of View Farm maintains commitments to a broad set of principles that go far beyond most certification programs by addressing labor issues, community values and marketing as well as how the animals are fed (no GMO&apos;s). All our farm practices also meet the standards for Humanely Raised although we are not certified as such.<br/>
<br/>
We strive to breed lambs true to the Finnsheep breed standard with excellent health, confirmation, maternal instincts and high quality wool that are hearty and easy to care for with minimal extra inputs. At Point of View Farm, we have very high health and breeding selection criteria. We only select the very best genetics and individuals to be used/sold as breeding stock. Furthermore, our flock is enrolled in the USDA scrapie export program as NY120 with annual USDA inspections and routine yearly testing and sampling to verify the health of the flock and absence of scrapie.
 </p>
            </div>
        </div>
        <Image src="/farm.jpg" alt="Finnsheep Farm" width={1500} height={1500} className='h-auto w-full mt-4'/>

    </div>
  )
}

export default AboutPage