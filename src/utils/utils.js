export function totalExpenditures(logs, grantId) {
  const grantExpendituresLogs = logs.filter(
    (log) => log.log_type.toLowerCase() === 'expenditure' && log.grant_id === Number(grantId)
  );

  let expenditureAmount = 0;
  for (let i = 0; i < grantExpendituresLogs.length; i++) {
    expenditureAmount += grantExpendituresLogs[i].expenditure_amount || 0;
  }

  return expenditureAmount;
}
