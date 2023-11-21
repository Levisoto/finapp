import { CreateClient } from "forms";
import { useGetParameters } from "hooks";
import { Container } from "components/ui";
import { DialogProvider } from "utils/dialog";
import { dialogs } from "components/dialogs";
import { Layout } from "components/layout/layout";

export function Dashboard() {
  const [degravamen, seguro] = useGetParameters();
  return (
    <DialogProvider dialogs={dialogs}>
      <Layout>
        <div className="bg-background">
          <Container className="mt-10">
            <div className="w-full flex flex-col gap-10">
              <div className="w-full flex items-center justify-between">
                <p>
                  {`Tasa de  seguro de desgravamen:  `}
                  <span className="bg-[#4C49ED] text-secondary rounded-md p-2 mr-2">{`${
                    degravamen * 100
                  }% `}</span>
                </p>
                <p>
                  {`Tasa de seguro vehicular anual`}
                  <span className="bg-[#4C49ED] text-secondary rounded-md p-2 m-2">{`${
                    seguro * 100
                  }% `}</span>
                </p>
              </div>
              <CreateClient />
            </div>
          </Container>
        </div>
      </Layout>
    </DialogProvider>
  );
}

export default Dashboard;
