export const getConversationId = async (userId) => {
  let res = await fetch(`https://mnpai.montaignelabs.com/mnpai/new_convo/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userId,
    }),
  });

  res = await res.json();

  return res;
};

export const generateResponse = async (
  user_id,
  conversation_id,
  user_query
) => {
  let res = await fetch(`https://mnpai.montaignelabs.com/mnpai/kuber/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: user_id,
      conversation_id: conversation_id,
      user_query: user_query,
    }),
  });

  res = await res.json();

  return res;
};
