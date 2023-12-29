import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Use & Share
        <br className="max-md:hidden"/>
        {/* <span className="orange_gradient text-center"> AI-Powered Prompt</span> */}
        <p className="font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">AI-Powered Prompt</p>


      </h1>
      <p className="desc text-center">
        Prompt Engineering is really best way to utilize the power of AI, Use & Share Now!!
      </p>

      <Feed />
    </section>
  )
}

export default Home