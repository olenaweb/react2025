export async function getData(search: string = ""): Promise<Response> {
  try {
    const result = await fetch(`https://rickandmortyapi.com/api/character/?name=${search}`);
    if (!result.ok) {
      throw new Error();
    }
    return result.json();
  } catch {
    throw new Error("Something's gone wrong :-( ");
  }
}
