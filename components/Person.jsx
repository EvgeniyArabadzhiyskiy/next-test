import Link from "next/link";

export default function PersonComponent({ person }) {
  return (
    <li>
      <Link href="/person/[id]" as={`/person/${person.id}`}>
        {person.name}
      </Link>
    </li>
  );
}
