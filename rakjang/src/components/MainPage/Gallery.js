const Gallery = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16">
      <div className="text-2xl font-semibold md:text-2xl mb-8  textlinear   pt-10 mr-0 ">
        Gallery
      </div>
      <div className="flex ">
        <div className="w-2/3 mr-4  ">
          <img className="w-full h-full  object-cover" src="../gallery/1.jpg" />
        </div>
        <div className="w-1/3  ">
          <img className="w-full h-full  object-cover" src="../gallery/2.jpg" />
        </div>
      </div>
      <div className="flex mt-4 ">
        <div className="w-1/3 mr-4 ">
          <img className="w-full h-full  object-cover" src="../gallery/3.jpg" />
        </div>
        <div className="w-2/3   ">
          <img className="w-full h-full  object-cover" src="../gallery/4.jpg" />
        </div>
      </div>
      <div className="flex mt-4 ">
        <div className="w-2/3 mr-4  ">
          <img className="w-full h-full  object-cover" src="../gallery/5.jpg" />
        </div>
        <div className="w-1/3  ">
          <img className="w-full h-full  object-cover" src="../gallery/6.jpg" />
        </div>
      </div>
    </div>
  );
};
export default Gallery;
