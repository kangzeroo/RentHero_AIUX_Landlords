
const authHeaders = () => {
  return {
    headers: {
      jwt: localStorage.getItem('header_token'),
      user_id: localStorage.getItem('user_id'),
      push_notifications: Notification.permission,
    }
  }
}

export default authHeaders;
