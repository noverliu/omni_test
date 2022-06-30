export const copy = async ({ name, content }) => {
  try {
    await navigator.clipboard.writeText(content)
    alert(`${name} copied!`)
  } catch (ex) {
    console.log(`Error in copying ${name}`);    
  }
};