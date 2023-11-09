export async function getInvoiceData(token: string) {
    const { signal } = new AbortController();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/invoice?token=${token}`,
        // had to add params since this is now a GET request (RH)
        {
          signal,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    
      return res.json();
    } catch (err) {
      console.log(err);
      return err;
    }
  }