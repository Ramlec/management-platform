import { UserRoles } from "./roles.enum";

export const ROLES_METADATA: Record<UserRoles, { label: string; description: string; permissions: string[] }> = {
    [UserRoles.ADMIN]: {
        label: `Administrateur`,
        description: `Un rôle particulier qui ne peut être délivré que par un autre administrateur. Il a accès à toutes les fonctions du site et peut donner n'importe quel rôle.`,
        permissions: [`*`]
    },
    [UserRoles.COMMITEE]: {
        label: `Bureau`,
        description: `Personnes élues au bureau de l'association par les membres du CA`,
        permissions: [`*`],
    },
    [UserRoles.BOARD]: {
        label: `Bureau`,
        description: `Personnes élues au CA de l'association par les membres actifs. Il peuvent nommer quelqu'un comme membre actif.`,
        permissions: [`*`],
    },
    [UserRoles.SERVICES_BOARD]: {
        label: `Bureau des services`,
        description: `C'est un rôle particulier. Ils sont les seuls (avec un administrateur) à pouvoir changer le rôle de quelqu'un en référent ou barista`,
        permissions: [`*`],
    },
    [UserRoles.REFERANT]: {
        label: `Référent`,
        description: `Le niveau au-dessus du barista. Il est responsable du bon fonctionnement du bar son shift. Il possède un code à 4 chiffres pour pouvoir se connecter à l'outil de caisse. Cette personne doit pouvoir accéder à l'interface de validation d'adhésion au travers de son code à 4 chiffres (note pour plus tard, une fois connecter à l'interface de validation, la connexion doit rester active jusqu'à 5h le lendemain matin)`,
        permissions: [`*`],
    },
    [UserRoles.BARISTA]: {
        label: `Barista`,
        description: `A suivi la formation pour être barman derrière le bar`,
        permissions: [`*`],
    },
    [UserRoles.ACTIVE_MEMBER]: {
        label: `Membre actif`,
        description: `S'est investit au moins une fois dans le bar au cours de l'année`,
        permissions: [`*`],
    },
    [UserRoles.MEMBER]: {
        label: `Membre`,
        description: `Niveau basique de l'adhérent. Il a juste payé son adhésion et elle est validée.`,
        permissions: [`*`],
    },
    [UserRoles.USER]: {
        label: `Utilisateur`,
        description: `La personne est inscrite mais n'a pas payé son adhésion (ou cette dernière n'est pas validée)`,
        permissions: [`*`],
    },
    [UserRoles.GUEST]: {
        label: `Invité`,
        description: `Une personne qui n'est pas inscrite à l'association et qui ne peut pas accéder à l'interface de validation d'adhésion`,
        permissions: [`*`],
    },
}
