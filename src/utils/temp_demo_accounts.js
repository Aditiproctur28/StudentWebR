export default function filterDemoAccounts(login_inst_id) {
  let demo_acnts = [0];
  if (login_inst_id && demo_acnts.includes(login_inst_id)) {
    return false;
  }
  return true;
}
