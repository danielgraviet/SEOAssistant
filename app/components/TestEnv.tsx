export default function TestEnv() {
    console.log("API Key:", process.env.NEXT_PUBLIC_OPENAI_API_KEY); // Will log in the browser console (if using NEXT_PUBLIC)
  
    return <div>Check the console for the API key.</div>;
  }
  