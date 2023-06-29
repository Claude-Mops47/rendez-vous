
import { Footer } from 'flowbite-react';
import { useSelector } from 'react-redux';

export default function DefaultFooter() {
  const auth = useSelector((state) => state.auth?.value);

  if (!auth) return null;
  return (
    <Footer container>
      <Footer.Copyright
        by="Linkuup"
        href="#"
        year={2023}
      />
      <Footer.LinkGroup>
        <Footer.Link href="#">
          About
        </Footer.Link>
        <Footer.Link href="#">
          Privacy Policy
        </Footer.Link>
        <Footer.Link href="#">
          Licensing
        </Footer.Link>
        <Footer.Link href="#">
          Contact
        </Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  )
}


