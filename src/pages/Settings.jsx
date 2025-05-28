import Heading from "../ui/Heading";
import Spinner from "../ui/Spinner";

import { useSetting } from "../features/settings/useSetting";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Row from "../ui/Row";

function Settings() {
  const { isLoading } = useSetting();

  if (isLoading) return <Spinner />;

  return (
    <Row type="vertical">
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
