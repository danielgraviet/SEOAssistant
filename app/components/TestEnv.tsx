export default function TestEnv() {
    console.log("API Key:", process.env.OPENAI_API_KEY); // Will log in the browser console (if using NEXT_PUBLIC)
  
    return <div>Check the console for the API key.</div>;
  }
  