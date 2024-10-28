
export default function Images() {

  const assets=[
    {
      img1:"https://s.yimg.com/ny/api/res/1.2/dW2TR0A.8kzmZtSRrQbpzA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyNDI7aD02OTk7Y2Y9d2VicA--/https://media.zenfs.com/en/coach_705/b95fd90a12d6e92049d340948d1e9a20",
      img2:"https://www.basic-fit.com/dw/image/v2/BDFP_PRD/on/demandware.static/-/Library-Sites-basic-fit-shared-library/default/dw126f1496/Campaigns/Commercial%20Page/Landscape-Basic%20Fit%20Almere%2024-10-221257.jpeg?sw=968",
      img3:"https://www.healthwellbeing.com/wp-content/uploads/2021/03/MAIN-IMAGE-RESIZED-shutterstock_499280881-1300x600.jpg",
        img4:"https://assets.vegasnearme.com/app/vnm-activity-dt/8/8885.jpg",
        img5:"https://www.indy100.com/media-library/picture.jpg?id=28116704&width=1245&height=700&quality=85&coordinates=118%2C0%2C118%2C0"
      }
  ]

  return (
    <div className='grid grid-cols-2 w-full h-[450px] gap-2 m-4 p-10'>
    <div className="bg-purple-300 rounded-xl " style={{ backgroundImage: `url(${assets[0].img1})`, backgroundSize: 'cover' }}></div>
    <div className='grid grid-cols-2 grid-rows-2 gap-2'>
      <div className='bg-red-300 rounded-xl' style={{ backgroundImage: `url(${assets[0].img2})`, backgroundSize: 'cover' }}></div>
      <div className='bg-red-300 rounded-xl' style={{ backgroundImage: `url(${assets[0].img3})`, backgroundSize: 'cover' }}></div>
      <div className='bg-red-300 rounded-xl' style={{ backgroundImage: `url(${assets[0].img4})`, backgroundSize: 'cover' }}></div>
      <div className='bg-red-300 rounded-xl' style={{ backgroundImage: `url(${assets[0].img5})`, backgroundSize:'cover'}}></div>
    </div>
  </div>
);
}
