import { getYear } from "../utilities/utils";

function Footer({ copyright, author }) {
    return(
        <footer>
            <p>&copy; {copyright} {author}</p> 
        </footer>
    );
}

Footer.defaultProps = {
    copyright: getYear(),
    author: "Anonymous"
};

export default Footer;