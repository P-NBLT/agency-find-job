import { Button } from "../../component/atoms";
import { useRouter } from "next/router";
function success() {
  const router = useRouter();
  return (
    <div>
      <p>Succesful request!</p>
      <div>
        <Button onClick={() => router.push("/agencies/new")}>
          Add a new agency
        </Button>
        <Button onClick={() => router.push("/")}>
          Go back to the search page
        </Button>
      </div>
    </div>
  );
}

export default success;
