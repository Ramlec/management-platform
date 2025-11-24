import { UserRoles } from "./roles.enum";

export const ROLES_METADATA: Record<
    UserRoles,
    {
        description: string;
        label: string;
    }
> = {
    [UserRoles.ACTIVE_MEMBER]: {
        description: `S'est investit au moins une fois dans le bar au cours de l'année`,
        label: `Membre actif`,
    },
    [UserRoles.ADMIN]: {
        description: `Un rôle particulier qui ne peut être délivré que par un autre administrateur. Il a accès à toutes les fonctions du site et peut donner n'importe quel rôle.`,
        label: `Administrateur`,
    },
    [UserRoles.BARISTA]: {
        description: `A suivi la formation pour être barman derrière le bar`,
        label: `Barista`,
    },
    [UserRoles.BOARD]: {
        description: `Personnes élues au CA de l'association par les membres actifs. Il peuvent nommer quelqu'un comme membre actif.`,
        label: `Conseil d'administration`,
    },
    [UserRoles.COMMITEE]: {
        description: `Personnes élues au bureau de l'association par les membres du CA`,
        label: `Bureau`,
    },
    [UserRoles.GUEST]: {
        description: `Une personne qui n'est pas inscrite à l'association et qui ne peut pas accéder à l'interface de validation d'adhésion`,
        label: `Invité`,
    },
    [UserRoles.MEMBER]: {
        description: `Niveau basique de l'adhérent. Il a juste payé son adhésion et elle est validée.`,
        label: `Membre`,
    },
    [UserRoles.REFERANT]: {
        description: `Le niveau au-dessus du barista. Il est responsable du bon fonctionnement du bar son shift. Il possède un code à 4 chiffres pour pouvoir se connecter à l'outil de caisse. Cette personne doit pouvoir accéder à l'interface de validation d'adhésion au travers de son code à 4 chiffres (note pour plus tard, une fois connecter à l'interface de validation, la connexion doit rester active jusqu'à 5h le lendemain matin)`,
        label: `Référent`,
    },
    [UserRoles.SERVICES_BOARD]: {
        description: `C'est un rôle particulier. Ils sont les seuls (avec un administrateur) à pouvoir changer le rôle de quelqu'un en référent ou barista`,
        label: `Bureau des services`,
    },
    [UserRoles.USER]: {
        description: `La personne est inscrite mais n'a pas payé son adhésion (ou cette dernière n'est pas validée)`,
        label: `Utilisateur`,
    },
};
