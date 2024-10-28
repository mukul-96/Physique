const Spinner = () => (
    <div className=' flex space-x-3 justify-center items-center mt-2'>
 	<span className='sr-only'>Loading...</span>
  	<div className='h-4 w-4  bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
	<div className='h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
	<div className='h-4 w-4  bg-white rounded-full animate-bounce'></div>
</div>
);

export default Spinner;
