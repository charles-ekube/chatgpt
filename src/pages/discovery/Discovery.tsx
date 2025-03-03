import React, { useState } from "react";
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonFooter, IonButton, IonIcon, IonButtons, IonMenuButton, IonLabel, useIonRouter } from "@ionic/react";
import { heartOutline, chatbubbleOutline, addOutline, homeOutline, bookOutline, starOutline, chevronDownOutline, contract, sparklesOutline, arrowUp, ellipsisVertical, heart, chatbubbleEllipsesOutline, syncOutline } from "ionicons/icons";
import { Add, Global, Microphone2, SearchNormal } from "iconsax-react";
import { DiscoveryImage } from "../../assets/images";



interface Reply {
    id: number;
    author: string;
    text: string;
    timestamp: string;
    likes: number;
    liked: boolean;
}


interface Comment {
    id: number;
    author: string;
    text: string;
    timestamp: string;
    likes: number;
    replies: Reply[];
    liked: boolean;
    showReplyInput: boolean;
}

interface Post {
    id: number;
    title: string;
    author: string;
    likes: number;
    comments: Comment[];
    reposts: number;
    liked: boolean;
    showComments: boolean;
    showReplies: boolean;
    showCommentInput: boolean;
}

const Discovery: React.FC = () => {

    const [newComment, setNewComment] = useState("");
    const [newReply, setNewReply] = useState("");
    const [openModal, setModalOpen] = useState(false);

    const modalToggle = () => {
        setModalOpen(!openModal);
    };

    const isActive = (path: string) => window.location.pathname === path;

    const navigation = useIonRouter()

    const goToHome = () => {
        navigation.push('/app/home', 'root')
    }

    const goToDiscovery = () => {
        navigation.push('/app/discovery', 'root')
    }
    const goToWorkspace = () => {
        navigation.push('/app/workspace', 'root')
    }
    const [posts, setPosts] = useState<Post[]>([
        {
            id: 1,
            title: "Realistic White Man Standing",
            author: "Jake Peralta",
            likes: 28,
            comments: [
                {
                    id: 1,
                    author: "Amy Santiago",
                    text: "Lorem ipsum dolor sit amet consectetur adipiscing elit et masa mi.",
                    timestamp: "2 hours ago",
                    likes: 0,
                    replies: [],
                    liked: false,
                    showReplyInput: false
                },
                {
                    id: 2,
                    author: "Joey Chaplin",
                    text: "Lorem ipsum dolor sit amet consectetur adipiscing elit et masa mi.",
                    timestamp: "45 minutes ago",
                    likes: 2,
                    replies: [],
                    liked: false,
                    showReplyInput: false,
                }
            ],
            reposts: 12,
            liked: false,
            showComments: false,
            showReplies: true,
            showCommentInput: false,
        },

        // ... other posts with similar structure
    ]);

    const toggleLike = (postId: number) => {
        setPosts(currentPosts =>
            currentPosts.map(post =>
                post.id === postId
                    ? {
                        ...post,
                        likes: post.liked ? post.likes - 1 : post.likes + 1,
                        liked: !post.liked
                    }
                    : post
            )
        );
    };

    const toggleComments = (postId: number) => {
        setPosts(currentPosts =>
            currentPosts.map(post =>
                post.id === postId
                    ? { ...post, showComments: !post.showComments }
                    : post
            )
        );
    };

    const toggleReplies = (postId: number) => {
        setPosts(currentPosts =>
            currentPosts.map(post =>
                post.id === postId
                    ? { ...post, showReplies: !post.showReplies }
                    : post
            )
        );
    };


    // Like a comment
    const likeComment = (postId: number, commentId: number) => {
        setPosts(currentPosts =>
            currentPosts.map(post => {
                if (post.id === postId) {
                    const updatedComments = post.comments.map(comment => {
                        if (comment.id === commentId) {
                            return {
                                ...comment,
                                likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
                                liked: !comment.liked
                            };
                        }
                        return comment;
                    });
                    return { ...post, comments: updatedComments };
                }
                return post;
            })
        );
    };


    // Toggle reply input field for a comment
    const toggleReplyInput = (postId: number, commentId: number) => {
        setPosts(currentPosts =>
            currentPosts.map(post => {
                if (post.id === postId) {
                    const updatedComments = post.comments.map(comment => {
                        if (comment.id === commentId) {
                            return {
                                ...comment,
                                showReplyInput: !comment.showReplyInput
                            };
                        }
                        return comment;
                    });
                    return { ...post, comments: updatedComments };
                }
                return post;
            })
        );
    };


    // Add a reply to a comment
    const addReply = (postId: number, commentId: number, replyText: string) => {
        if (!replyText.trim()) return;

        setPosts(currentPosts =>
            currentPosts.map(post => {
                if (post.id === postId) {
                    const updatedComments = post.comments.map(comment => {
                        if (comment.id === commentId) {
                            return {
                                ...comment,
                                replies: [...comment.replies, {
                                    id: Date.now(),
                                    author: "Current User",
                                    text: replyText,
                                    timestamp: "just now",
                                    likes: 0,
                                    liked: false
                                }],
                                showReplyInput: false
                            };
                        }
                        return comment;
                    });
                    return { ...post, comments: updatedComments };
                }
                return post;
            })
        );
        setNewReply("");
    };

    // Share a comment
    const shareComment = (postId: number, commentId: number) => {
        // Implement your sharing logic here
        console.log(`Sharing comment ${commentId} from post ${postId}`);
        // This could open a share modal or trigger a native share API
    };

    // Toggle comment input field for a post
    const toggleCommentInput = (postId: number) => {
        setPosts(currentPosts =>
            currentPosts.map(post =>
                post.id === postId
                    ? { ...post, showCommentInput: !post.showCommentInput }
                    : post
            )
        );
    };

    // Add a new comment to a post
    const addComment = (postId: number) => {
        if (!newComment.trim()) return;

        setPosts(currentPosts =>
            currentPosts.map(post => {
                if (post.id === postId) {
                    return {
                        ...post,
                        comments: [...post.comments, {
                            id: Date.now(),
                            author: "Current User",
                            text: newComment,
                            timestamp: "just now",
                            likes: 0,
                            replies: [],
                            liked: false,
                            showReplyInput: false
                        }],
                        showCommentInput: false
                    };
                }
                return post;
            })
        );
        setNewComment("");
    };




    return (
        <IonPage>
            <header style={{ padding: "16px", backgroundColor: "#f5f5f5", borderBottom: "1px solid #DFDFDF", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h2 style={{ color: "#313131", fontWeight: 600 }}>Discover</h2>
            </header>

            <IonContent className="ion-padding">
                <div className="flex flex-col items-center" style={{ padding: ' 40xp 20px' }}>
                    {posts.map((post) => (
                        <div>
                            <div id={"discoveryCardContainer"}>
                                <img src={DiscoveryImage} alt="discovery" />

                                <div id={'discoveryCardContent'}>
                                    <div id={'discoveryCardContentHeader'} className={"myFlex myJustifyBetween"}>
                                        <h3 style={{ fontSize: '15px', fontWeight: 500, color: '#F0F0F0', paddingTop: '10px' }}>{post.title}</h3>
                                        {/* <IonIcon src={ellipsisVertical} style={{ color: '#ffffff', fontSize: '10px' }} /> */}
                                    </div>
                                    <div id={'discoveryCardContentFooter'} className={"myFlex myJustifyBetween"}>
                                        <div className={"myFlex mygap"}>
                                            <img src={DiscoveryImage} alt="discovery" style={{ width: '30px', height: '30px', borderRadius: '99px' }} />
                                            <p style={{ fontSize: '10px', fontWeight: 500, color: '#F0F0F0' }}>{post.author}</p>
                                        </div>
                                        <div className={"myFlex mygap"}>
                                            <div className={"myFlex mygap miniActionContainer"} onClick={() => toggleLike(post.id)}>
                                                {post?.liked ? <>
                                                    <IonIcon src={heart} style={{ color: '#F00000', fontSize: '10px' }} />
                                                </> :
                                                    <IonIcon src={heart} style={{ color: '#ffffff', fontSize: '10px' }} />}
                                                <p style={{ color: '#FFFFFF', fontSize: '10px', fontWeight: 500 }}>{post.likes}</p>
                                            </div>
                                            <div className={"myFlex mygap miniActionContainer"} onClick={() => toggleComments(post.id)}>
                                                <IonIcon src={chatbubbleEllipsesOutline} style={{ color: '#ffffff', fontSize: '10px' }} />
                                                <p style={{ color: '#FFFFFF', fontSize: '10px', fontWeight: 500 }}>{post.comments.length}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {post.showComments && (
                                <div className="comments-container">
                                    {/* <div className="comments-section"> */}

                                    {/* Add Comment Input */}
                                    {/* <div className="comment-input-container">
                                            <input
                                                type="text"
                                                value={newComment}
                                                onChange={(e) => setNewComment(e.target.value)}
                                                placeholder="Write a comment..."
                                                className="comment-input"
                                            />
                                            <button
                                                onClick={() => addComment(post.id)}
                                                className="comment-submit-button"
                                            >
                                                Post
                                            </button>
                                        </div> */}

                                    {/* Comments List */}
                                    {post.showComments && (
                                        <div className="comments-container">
                                            <div className="comments-section">
                                                <h4 className="comments-title" style={{ color: '#575757', fontSize: '15px' }}>Comments ({post.comments.length})</h4>

                                                {/* Main comment */}
                                                {post.comments.map((comment) => (
                                                    <div key={comment.id} className="comment-item">
                                                        <div className="comment-content">
                                                            <div className="comment-avatar-container">
                                                                <img src={DiscoveryImage} alt={comment.author} className="comment-avatar" />
                                                            </div>
                                                            <div className="comment-main">
                                                                <div className="comment-header">
                                                                    <span className="comment-author">{comment.author}</span>
                                                                    <span className="comment-time">{comment.timestamp}</span>
                                                                </div>
                                                                <p className="comment-text">{comment.text}</p>
                                                                <div className="comment-actions">
                                                                    <button className="comment-action-button">
                                                                        <IonIcon src={heart} style={{ color: '#313131', fontSize: '12px' }} />
                                                                    </button>
                                                                    <button className="comment-action-button">
                                                                        <IonIcon src={chatbubbleEllipsesOutline} style={{ color: '#313131', fontSize: '12px' }} />
                                                                    </button>
                                                                    <button className="comment-action-button">
                                                                        <IonIcon src={syncOutline} style={{ color: '#313131', fontSize: '12px' }} />
                                                                    </button>
                                                                </div>

                                                                {/* Replies with connector line */}
                                                                {comment.replies && comment.replies.length > 0 && (
                                                                    <div className="comments-thread">
                                                                        <div className="comment-connector"></div>
                                                                        {comment.replies.map((reply) => (
                                                                            <div key={reply.id} className="comment-reply">
                                                                                <div className="comment-content">
                                                                                    <div className="comment-avatar-container">
                                                                                        <img src={DiscoveryImage} alt={reply.author} className="comment-avatar" />
                                                                                    </div>
                                                                                    <div className="comment-main">
                                                                                        <div className="comment-header">
                                                                                            <span className="comment-author">{reply.author}</span>
                                                                                            <span className="comment-time">{reply.timestamp}</span>
                                                                                        </div>
                                                                                        <p className="comment-text">{reply.text}</p>
                                                                                        <div className="comment-actions">
                                                                                            <button className="comment-action-button">
                                                                                                <IonIcon src={heart} style={{ color: '#313131', fontSize: '12px' }} />
                                                                                            </button>
                                                                                            <button className="comment-action-button">
                                                                                                <IonIcon src={chatbubbleEllipsesOutline} style={{ color: '#313131', fontSize: '12px' }} />
                                                                                            </button>
                                                                                            <button className="comment-action-button">
                                                                                                <IonIcon src={syncOutline} style={{ color: '#313131', fontSize: '12px' }} />
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {/* </div> */}
                                </div>
                            )}
                        </div>
                    ))}

                </div>

                <div id={'myFloatingBtn'}>
                    <IonIcon src={addOutline} style={{ color: '#ffffff', fontSize: '20px', fontWeight: 'bold' }} />
                </div>
            </IonContent>

            <IonFooter>
                <div id={"homeFooter"}>
                    <div id={"chatInputMainContainer"}>
                        <div id={"bottomNavigatorContainer"}>
                            <div>
                                <button
                                    style={{
                                        color: isActive("/app/home") ? "#1B42D2" : "#5D6993",
                                    }}
                                    onClick={goToHome}
                                >
                                    <SearchNormal size="20" />
                                    <p>Home</p>
                                </button>
                            </div>

                            <div>
                                <button
                                    style={{
                                        color: isActive("/app/workspace") ? "#1B42D2" : "#5D6993",
                                    }}
                                    onClick={goToWorkspace}
                                >
                                    <IonIcon icon={sparklesOutline} style={{ height: "20px", width: "20px" }} />
                                    <p>Workspace</p>
                                </button>
                            </div>

                            <div>
                                <button
                                    style={{
                                        color: isActive("/app/discovery") ? "#1B42D2" : "#5D6993",
                                    }}
                                    onClick={goToDiscovery}
                                >
                                    <IonIcon icon={bookOutline} style={{ height: "20px", width: "20px" }} />
                                    <p>Discovery</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </IonFooter>
        </IonPage>
    );
};

export default Discovery;


