import React from 'react'

function PageNotFound() {
  return (
    <section className="gradient-animation h-screen flex justify-center items-center bg-whit ">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl text-zinc-950 tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Something's missing.</p>
          <p className="mb-4 text-2xl font-light text-stone-900 ">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
          <a href="/" className="inline-flex bg-zinc-800 text-white bg-primary-600 hover:bg-primary-800 hover:scale-90 transition-all duration-75 transform focus:ring-4 font-bold tracking-wide rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Back to Homepage</a>
        </div>
      </div>
    </section>
  )
}

export default PageNotFound