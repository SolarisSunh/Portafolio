import PropTypes from "prop-types";
import 'katex/dist/katex.min.css';
import { InlineMath } from "react-katex";
import { latexFromPlain } from "../utils/latex.js";

export default function MathText({ text }) {
  const latex = latexFromPlain(text);
  return <InlineMath math={latex} />;
}

MathText.propTypes = {
  text: PropTypes.string,
};




