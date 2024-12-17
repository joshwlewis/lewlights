const Donate = () => {
  return (
    <>
      <p>
        Our show is provided free of charge for everyone and anyone.
        If you would like to support us, please consider voting
        for &quot;LewLights&quot; in the &nbsp;
        <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href="https://lakelandlightshowdown.com">
            Lakeland Lights Showdown
        </a>.
        Each dollar that you donate benefits Lakeland students, and helps
        us to reach this year&apos;s top spot!
      </p>
      <div className="my-4 grid grid-cols-5 gap-4 items-center">
        <div className="col-span-3">
          <p><b>Step 1:</b></p>
          <div>Use the form to vote for your favorite lights and enter your info</div>
        </div>
        <div className="col-span-2">
          <a className="w-full inline-block p-4 rounded bg-blue-500 hover:bg-blue-700 hover:underline" href="https://dmcgarry.typeform.com/to/ch7BVOGe" target="_blank" rel="noopener noreferrer">
            Vote for LewLights!
          </a>
        </div>
        <div className="col-span-3">
          <p><b>Step 2:</b></p>
          <p>Donate as much as you&apos;d like to Lakeland Schools (each $1 donated is 1 vote)</p>
        </div>
        <div className="col-span-2">
          <a className="w-full inline-block p-4 rounded bg-blue-500 hover:bg-blue-700 hover:underline" href="https://www.paypal.com/ncp/payment/9X9G2F37YRUF2" target="_blank" rel="noopener noreferrer">
            Donate to Lakeland Schools!
          </a>
         </div>
      </div>
    </>
  );
}

export default Donate;

