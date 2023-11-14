import { CreateClient } from "forms";
import { useGetParameters } from "hooks";
import { Container } from "components/ui";

export function Dashboard() {
  const [degravamen, seguro] = useGetParameters();
  return (
    <div className="bg-background min-h-screen">
      <Container className="mt-40">
        <div className="w-full flex flex-col gap-10">
          <div className="w-full flex items-center justify-between">
            <p>
              {`Tasa de  seguro de desgravamen:  `}
              <span className="bg-primary text-secondary rounded-md p-2 mr-2">{`${
                degravamen * 100
              }% `}</span>
            </p>
            <p>
              {`Tasa de seguro vehicular anual`}
              <span className="bg-primary text-secondary rounded-md p-2 m-2">{`${
                seguro * 100
              }% `}</span>
            </p>
          </div>
          <CreateClient />
        </div>
      </Container>
    </div>
  );
}

export default Dashboard;
